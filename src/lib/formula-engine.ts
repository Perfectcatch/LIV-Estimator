// ============================================================
// FORMULA ENGINE — Tokenizer, Parser, Evaluator
// Supports: +, -, *, /, ^, sqrt, round, floor, ceil,
//           min, max, if, coalesce, cast, number, abs
//           Comparisons: =, !=, <, <=, >, >=
//           Logical: and, or
//           Parameters: {param name}
//           Strings: "text" or 'text'
// ============================================================

// ─── Token Types ────────────────────────────────────────────
export enum TokenType {
  NUMBER = "NUMBER",
  STRING = "STRING",
  PARAM = "PARAM",
  PLUS = "PLUS",
  MINUS = "MINUS",
  STAR = "STAR",
  SLASH = "SLASH",
  CARET = "CARET",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  COMMA = "COMMA",
  EQ = "EQ",
  NEQ = "NEQ",
  LT = "LT",
  LTE = "LTE",
  GT = "GT",
  GTE = "GTE",
  AND = "AND",
  OR = "OR",
  IDENT = "IDENT",
  EOF = "EOF",
}

export interface Token {
  type: TokenType;
  value: string | number;
  pos: number;
}

// ─── AST Node Types ────────────────────────────────────────
export type ASTNode =
  | { type: "number"; value: number }
  | { type: "string"; value: string }
  | { type: "param"; name: string }
  | { type: "null" }
  | { type: "boolean"; value: boolean }
  | { type: "binary"; op: string; left: ASTNode; right: ASTNode }
  | { type: "unary"; op: string; operand: ASTNode }
  | { type: "call"; func: string; args: ASTNode[] }
  | { type: "logical"; op: "and" | "or"; left: ASTNode; right: ASTNode };

// ─── Tokenizer ──────────────────────────────────────────────
export function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < expr.length) {
    // Skip whitespace
    if (/\s/.test(expr[i])) {
      i++;
      continue;
    }

    // Numbers
    if (
      /\d/.test(expr[i]) ||
      (expr[i] === "." && i + 1 < expr.length && /\d/.test(expr[i + 1]))
    ) {
      let num = "";
      const start = i;
      while (i < expr.length && (/\d/.test(expr[i]) || expr[i] === ".")) {
        num += expr[i++];
      }
      tokens.push({ type: TokenType.NUMBER, value: parseFloat(num), pos: start });
      continue;
    }

    // Strings (single or double quoted)
    if (expr[i] === '"' || expr[i] === "'") {
      const quote = expr[i];
      const start = i;
      i++;
      let str = "";
      while (i < expr.length && expr[i] !== quote) {
        str += expr[i++];
      }
      if (i < expr.length) i++;
      tokens.push({ type: TokenType.STRING, value: str, pos: start });
      continue;
    }

    // Parameters {name}
    if (expr[i] === "{") {
      const start = i;
      i++;
      let name = "";
      while (i < expr.length && expr[i] !== "}") {
        name += expr[i++];
      }
      if (i < expr.length) i++;
      tokens.push({ type: TokenType.PARAM, value: name.trim(), pos: start });
      continue;
    }

    // Operators and punctuation
    const start = i;
    switch (expr[i]) {
      case "+": tokens.push({ type: TokenType.PLUS, value: "+", pos: start }); i++; continue;
      case "-": tokens.push({ type: TokenType.MINUS, value: "-", pos: start }); i++; continue;
      case "*": tokens.push({ type: TokenType.STAR, value: "*", pos: start }); i++; continue;
      case "/": tokens.push({ type: TokenType.SLASH, value: "/", pos: start }); i++; continue;
      case "^": tokens.push({ type: TokenType.CARET, value: "^", pos: start }); i++; continue;
      case "(": tokens.push({ type: TokenType.LPAREN, value: "(", pos: start }); i++; continue;
      case ")": tokens.push({ type: TokenType.RPAREN, value: ")", pos: start }); i++; continue;
      case ",": tokens.push({ type: TokenType.COMMA, value: ",", pos: start }); i++; continue;
      case "=": tokens.push({ type: TokenType.EQ, value: "=", pos: start }); i++; continue;
      case "!":
        if (i + 1 < expr.length && expr[i + 1] === "=") {
          tokens.push({ type: TokenType.NEQ, value: "!=", pos: start });
          i += 2;
        } else {
          throw new Error(`Unexpected character '!' at position ${i}`);
        }
        continue;
      case "<":
        if (i + 1 < expr.length && expr[i + 1] === "=") {
          tokens.push({ type: TokenType.LTE, value: "<=", pos: start });
          i += 2;
        } else {
          tokens.push({ type: TokenType.LT, value: "<", pos: start });
          i++;
        }
        continue;
      case ">":
        if (i + 1 < expr.length && expr[i + 1] === "=") {
          tokens.push({ type: TokenType.GTE, value: ">=", pos: start });
          i += 2;
        } else {
          tokens.push({ type: TokenType.GT, value: ">", pos: start });
          i++;
        }
        continue;
    }

    // Identifiers (function names, keywords)
    if (/[a-zA-Z_]/.test(expr[i])) {
      let ident = "";
      while (i < expr.length && /[a-zA-Z_0-9]/.test(expr[i])) {
        ident += expr[i++];
      }
      const lower = ident.toLowerCase();
      if (lower === "and") {
        tokens.push({ type: TokenType.AND, value: "and", pos: start });
      } else if (lower === "or") {
        tokens.push({ type: TokenType.OR, value: "or", pos: start });
      } else {
        tokens.push({ type: TokenType.IDENT, value: lower, pos: start });
      }
      continue;
    }

    throw new Error(`Unexpected character '${expr[i]}' at position ${i}`);
  }

  tokens.push({ type: TokenType.EOF, value: "", pos: i });
  return tokens;
}

// ─── Recursive Descent Parser ───────────────────────────────
const KNOWN_FUNCS = ["sqrt", "round", "floor", "ceil", "min", "max", "if", "coalesce", "cast", "number", "abs"];

class Parser {
  private tokens: Token[];
  private pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  private peek(): Token {
    return this.tokens[this.pos];
  }

  private advance(): Token {
    return this.tokens[this.pos++];
  }

  private expect(type: TokenType): Token {
    const t = this.peek();
    if (t.type !== type) {
      throw new Error(`Expected ${type} but got ${t.type} ("${t.value}") at position ${t.pos}`);
    }
    return this.advance();
  }

  parse(): ASTNode {
    const node = this.expression();
    if (this.peek().type !== TokenType.EOF) {
      const t = this.peek();
      throw new Error(`Unexpected token "${t.value}" at position ${t.pos}`);
    }
    return node;
  }

  private expression(): ASTNode {
    return this.orExpr();
  }

  private orExpr(): ASTNode {
    let left = this.andExpr();
    while (this.peek().type === TokenType.OR) {
      this.advance();
      const right = this.andExpr();
      left = { type: "logical", op: "or", left, right };
    }
    return left;
  }

  private andExpr(): ASTNode {
    let left = this.comparison();
    while (this.peek().type === TokenType.AND) {
      this.advance();
      const right = this.comparison();
      left = { type: "logical", op: "and", left, right };
    }
    return left;
  }

  private comparison(): ASTNode {
    let left = this.addition();
    const t = this.peek();
    if (
      [TokenType.EQ, TokenType.NEQ, TokenType.LT, TokenType.LTE, TokenType.GT, TokenType.GTE].includes(t.type)
    ) {
      const op = this.advance().value as string;
      const right = this.addition();
      left = { type: "binary", op, left, right };
    }
    return left;
  }

  private addition(): ASTNode {
    let left = this.multiplication();
    while (this.peek().type === TokenType.PLUS || this.peek().type === TokenType.MINUS) {
      const op = this.advance().value as string;
      const right = this.multiplication();
      left = { type: "binary", op, left, right };
    }
    return left;
  }

  private multiplication(): ASTNode {
    let left = this.power();
    while (this.peek().type === TokenType.STAR || this.peek().type === TokenType.SLASH) {
      const op = this.advance().value as string;
      const right = this.power();
      left = { type: "binary", op, left, right };
    }
    return left;
  }

  private power(): ASTNode {
    let left = this.unary();
    if (this.peek().type === TokenType.CARET) {
      this.advance();
      const right = this.unary();
      left = { type: "binary", op: "^", left, right };
    }
    return left;
  }

  private unary(): ASTNode {
    if (this.peek().type === TokenType.MINUS) {
      this.advance();
      const operand = this.unary();
      return { type: "unary", op: "-", operand };
    }
    return this.call();
  }

  private call(): ASTNode {
    if (this.peek().type === TokenType.IDENT) {
      const name = this.peek().value as string;

      if (KNOWN_FUNCS.includes(name)) {
        this.advance();
        this.expect(TokenType.LPAREN);
        const args: ASTNode[] = [];
        if (this.peek().type !== TokenType.RPAREN) {
          args.push(this.expression());
          while (this.peek().type === TokenType.COMMA) {
            this.advance();
            args.push(this.expression());
          }
        }
        this.expect(TokenType.RPAREN);
        return { type: "call", func: name, args };
      }

      // Keywords
      if (name === "null") { this.advance(); return { type: "null" }; }
      if (name === "true") { this.advance(); return { type: "boolean", value: true }; }
      if (name === "false") { this.advance(); return { type: "boolean", value: false }; }
      if (name === "date") { this.advance(); return { type: "string", value: new Date().toISOString().split("T")[0] }; }
      if (name === "datetime") { this.advance(); return { type: "string", value: new Date().toISOString() }; }

      throw new Error(`Unknown identifier "${name}" at position ${this.peek().pos}. Did you mean to wrap it in {curly braces} as a parameter?`);
    }
    return this.primary();
  }

  private primary(): ASTNode {
    const t = this.peek();

    if (t.type === TokenType.NUMBER) {
      this.advance();
      return { type: "number", value: t.value as number };
    }
    if (t.type === TokenType.STRING) {
      this.advance();
      return { type: "string", value: t.value as string };
    }
    if (t.type === TokenType.PARAM) {
      this.advance();
      return { type: "param", name: t.value as string };
    }
    if (t.type === TokenType.LPAREN) {
      this.advance();
      const expr = this.expression();
      this.expect(TokenType.RPAREN);
      return expr;
    }

    throw new Error(`Unexpected token "${t.value}" at position ${t.pos}`);
  }
}

// ─── Evaluator ──────────────────────────────────────────────
export type FormulaValue = number | string | boolean | null;

export function evaluate(node: ASTNode, context: Record<string, FormulaValue>): FormulaValue {
  switch (node.type) {
    case "number":
      return node.value;
    case "string":
      return node.value;
    case "boolean":
      return node.value;
    case "null":
      return null;

    case "param": {
      const val = context[node.name];
      if (val === undefined) {
        throw new Error(`Unknown parameter: {${node.name}}`);
      }
      return val;
    }

    case "unary": {
      const val = evaluate(node.operand, context);
      if (node.op === "-") return -(val as number);
      return val;
    }

    case "binary": {
      const left = evaluate(node.left, context);
      const right = evaluate(node.right, context);
      switch (node.op) {
        case "+": return (left as number) + (right as number);
        case "-": return (left as number) - (right as number);
        case "*": return (left as number) * (right as number);
        case "/": {
          if ((right as number) === 0) throw new Error("Division by zero");
          return (left as number) / (right as number);
        }
        case "^": return Math.pow(left as number, right as number);
        case "=": return left === right;
        case "!=": return left !== right;
        case "<": return (left as number) < (right as number);
        case "<=": return (left as number) <= (right as number);
        case ">": return (left as number) > (right as number);
        case ">=": return (left as number) >= (right as number);
        default: throw new Error(`Unknown operator: ${node.op}`);
      }
    }

    case "logical": {
      const left = evaluate(node.left, context);
      const right = evaluate(node.right, context);
      if (node.op === "and") return !!left && !!right;
      if (node.op === "or") return !!left || !!right;
      return false;
    }

    case "call": {
      switch (node.func) {
        case "sqrt": return Math.sqrt(evaluate(node.args[0], context) as number);
        case "abs": return Math.abs(evaluate(node.args[0], context) as number);
        case "round": {
          const val = evaluate(node.args[0], context) as number;
          const decimals = node.args[1] ? (evaluate(node.args[1], context) as number) : 0;
          const factor = Math.pow(10, decimals);
          return Math.round(val * factor) / factor;
        }
        case "floor": return Math.floor(evaluate(node.args[0], context) as number);
        case "ceil": return Math.ceil(evaluate(node.args[0], context) as number);
        case "min": {
          const vals = node.args.map((a) => evaluate(a, context) as number);
          return Math.min(...vals);
        }
        case "max": {
          const vals = node.args.map((a) => evaluate(a, context) as number);
          return Math.max(...vals);
        }
        case "if": {
          const condition = evaluate(node.args[0], context);
          return condition ? evaluate(node.args[1], context) : evaluate(node.args[2], context);
        }
        case "coalesce": {
          for (const arg of node.args) {
            const val = evaluate(arg, context);
            if (val !== null && val !== undefined) return val;
          }
          return null;
        }
        case "cast": {
          const val = evaluate(node.args[0], context);
          const targetType = evaluate(node.args[1], context) as string;
          if (targetType === "date") return String(val).split("T")[0];
          if (targetType === "datetime") return String(val);
          if (targetType === "number") return Number(val);
          if (targetType === "string") return String(val);
          return val;
        }
        case "number": {
          const str = String(evaluate(node.args[0], context));
          return Number(str.replace(/[$,]/g, ""));
        }
        default:
          throw new Error(`Unknown function: ${node.func}`);
      }
    }

    default:
      throw new Error(`Unknown node type`);
  }
}

// ─── Public API ─────────────────────────────────────────────
export function parseFormula(expr: string): ASTNode {
  const tokens = tokenize(expr);
  const parser = new Parser(tokens);
  return parser.parse();
}

export function evaluateFormula(expr: string, context: Record<string, FormulaValue>): FormulaValue {
  const ast = parseFormula(expr);
  return evaluate(ast, context);
}

export function validateFormula(expr: string): { valid: boolean; error?: string } {
  try {
    if (!expr.trim()) return { valid: false, error: "Expression is empty" };
    parseFormula(expr);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: (e as Error).message };
  }
}

export function extractParameters(expr: string): string[] {
  const params: string[] = [];
  const regex = /\{([^}]+)\}/g;
  let match;
  while ((match = regex.exec(expr)) !== null) {
    const name = match[1].trim();
    if (!params.includes(name)) params.push(name);
  }
  return params;
}

export default {
  meta: {
    type: "suggestion", // "problem" or "suggestion"
    docs: {
      description: "Força objetos a serem escritos em uma linha",
      category: "Stylistic Issues",
    },
    fixable: "whitespace", // "code" or "whitespace"
  },
  create(context) {
    return {
      ObjectPattern(node) {
        const sourceCode = context.getSourceCode();
        const text = sourceCode.getText(node);

        // Verifica se o objeto está em várias linhas
        if (text.includes("\n")) {
          context.report({
            node,
            message: "Objetos com múltiplas linhas não são permitidos.",
            fix(fixer) {
              // Coloca tudo em uma única linha
              const fixedText = text.replace(/\n/g, " ").replace(/\s+/g, " ");
              return fixer.replaceText(node, fixedText);
            },
          });
        }
      },
    };
  },
};

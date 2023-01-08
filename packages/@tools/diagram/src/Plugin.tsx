import visit from 'unist-util-visit'

export function Plugin() {
    return async (ast: any, file: any) => {
        console.log(file.path)

        visit(ast, (node: any) => {
            if (node.type === 'admonitionHTML') {
                // if (node.data?.hProperties?.type === 'diagram') {
                //     console.log(node);
                //     node.type = 'jsx';
                //     node.value = '<div>\n    ceci est un jsx\n    test\n    {` une string `}\n</div>';
                // }
            }
        })

        if (file.path === `C:\\_Orano\\Wiki\\wiki\\packages\\docs\\get-started.mdx`) {
            console.log(ast.children[4])
        }
    }
}
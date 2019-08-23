export interface IGraphQLList<T> {
  edges: [
    {
      node: T;
    }
  ]
}
export interface IFrontmatter<T> {
  frontmatter: T
}

export interface IAllMarkdownRemark<T> {
  allMarkdownRemark: IGraphQLList<T>
}

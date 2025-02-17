import Article from '../models/article.js';

export const getArticleById = async (id) => Article.findById(id);

export const getAllArticles = async () => Article.find();

export const createArticle = async (data) => Article.create(data);

export const updateArticle = async (id, data) =>
Article.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

export const removeArticle = async (id) => {
  const article = await Article.findById(id);
  article.remove();
}

export const getAllArticlesPaginated = async (size, page, showSecret) => {
    const query = showSecret ? {} : {isSecret: false};
    const count = await Article.count(query);

    const articles = await Article.find(query).skip(size * (page - 1)).limit(size);
    return {
      page,
      size,
      pages: Math.ceil(count / size),
      articles
    };
};
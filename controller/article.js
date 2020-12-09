import { articleService } from "../services/index.js";
import catchAsyncErrors from "../middleware/catchAsync.js";
import ErrorHandler from "../util/errorHandler.js";

export const get = catchAsyncErrors(async (req, res, next) => {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return next(
        new ErrorHandler(`Finner ikke artikkel ${req.params.id}`, 404)
      );
    }
    res.status(200).json(article);
  });

  export const getAll = catchAsyncErrors(async (req, res, next) => {
    const userRole = req.cookies.role;
    const allArticles = await articleService.getAllArticles();
    res.status(200).json(allArticles);
  });
  
  export const create = catchAsyncErrors(async (req, res, next) => {
    const article = await articleService.createArticle(req.body);
    res.status(201).json(article);
  });
  
  export const update = catchAsyncErrors(async (req, res, next) => {
    let article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return next(new ErrorHandler(`Finner ikke artikkel  ${req.params.id}`, 404));
    }
    article = await articleService.updateArticle(req.params.id, req.body);
    res.status(200).json(article);
  });
  
  export const remove = catchAsyncErrors(async (req, res, next) => {
    let article = await articleService.getArticleById(req.params.id);
    if(!article){
      return next(new ErrorHandler(`Finner ikke artikkel ${req.params.id}`, 404));
    }
    article = await articleService.removeArticle(req.params.id);
    res.status(204).json({})
  });
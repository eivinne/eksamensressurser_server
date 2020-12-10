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


  const PAGE_SIZE = 5;
  export const getAll = catchAsyncErrors(async (req, res, next) => {
    const size = parseInt(PAGE_SIZE);
    const page = parseInt(req.query.page ? req.query.page : 1);
    const showSecret = req.cookies.role ? true : false;

    const allArticlesPaginated = await articleService.getAllArticlesPaginated(size, page, showSecret);

    res.status(200).json(allArticlesPaginated);
  })
  
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
const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (error) {
            res.status(500).send(error);
        }
    };
}

const paginate = ({ page, pageSize }) => {
    const offset = page * pageSize;
    const limit = pageSize;

    return {
        offset,
        limit,
    };
};

/* GET books listing. */
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const books = await Book.findAll({
            order: [['createdAt', 'DESC']],
            limit: 10,
        });
        res.render('books/index', { books, title: 'Books' });
    })
);

/* Create a new book form. */
router.get('/new', (req, res) => {
    res.render('books/new', { book: {}, title: 'New Book' });
});

/* POST create book. */
router.post(
    '/',
    asyncHandler(async (req, res) => {
        let book;
        try {
            book = await Book.create(req.body);
            res.redirect('/books');
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                // checking the error
                book = await Book.build(req.body);
                res.render('books/new', {
                    book,
                    errors: error.errors,
                    title: 'New Book',
                });
            } else {
                throw error; // error caught in the asyncHandler's catch block
            }
        }
    })
);

/* Edit book form. */
router.get(
    '/:id/update',
    asyncHandler(async (req, res) => {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.render('books/update', { book, title: 'Update Book' });
        } else {
            // res.sendStatus(404);
            res.render('notFound');
        }
    })
);

/* GET individual book. */
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.render('books/update', { book, title: book.title });
        } else {
            // res.sendStatus(404);
            res.render('notFound');
        }
    })
);

/* Update a book. */
router.post(
    '/:id/update',
    asyncHandler(async (req, res) => {
        let book;
        try {
            book = await Book.findByPk(req.params.id);
            if (book) {
                await book.update(req.body);
                res.redirect('/books/' + book.id);
            } else {
                // res.sendStatus(404);
                res.render('notFound');
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                book = await Book.build(req.body);
                book.id = req.params.id; // make sure correct book gets updated
                res.render('books/update', {
                    book,
                    errors: error.errors,
                    title: 'Update Book',
                });
            } else {
                throw error;
            }
        }
    })
);

/* Delete book form. */
router.get(
    '/:id/delete',
    asyncHandler(async (req, res) => {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            res.render('books/delete', { book, title: 'Delete Book' });
        } else {
            // res.sendStatus(404);
            res.render('notFound');
        }
    })
);

/* Delete individual book. */
router.post(
    '/:id/delete',
    asyncHandler(async (req, res) => {
        const book = await Book.findByPk(req.params.id);
        if (book) {
            await book.destroy();
            res.redirect('/books');
        } else {
            // res.sendStatus(404);
            res.render('notFound');
        }
    })
);

module.exports = router;

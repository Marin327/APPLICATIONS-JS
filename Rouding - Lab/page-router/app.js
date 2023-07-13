import page from './node_modules/page/page.mjs'

import { homeView } from './views/home.js';
import { articlesView } from './views/articles.js';
import { aboutView } from './views/about.js';
import { articleDetailsView } from './views/articleDetailsView.js';
import { createView } from './views/create.js';

page('/home', homeView);
page('/about', aboutView);
page('/articles', articlesView);
page('/articles/:articleId', articleDetailsView);
page('/create', createView);

page.start();
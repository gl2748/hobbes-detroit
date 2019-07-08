import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProjectPostPreview from './preview-templates/ProjectPostPreview'

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('project', ProjectPostPreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)

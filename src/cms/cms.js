import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'

import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProjectPostPreview from './preview-templates/ProjectPostPreview'

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('project', ProjectPostPreview)

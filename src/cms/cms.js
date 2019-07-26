import CMS from 'netlify-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';

import { CookiePagePreview } from './preview-templates/CookiePagePreview';
import { IndexPagePreview } from './preview-templates/IndexPagePreview';
import { LegalPagePreview } from './preview-templates/LegalPagePreview';
import { ProjectPostPreview } from './preview-templates/ProjectPostPreview';

CMS.registerMediaLibrary(uploadcare);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('project', ProjectPostPreview);
CMS.registerPreviewTemplate('cookie', CookiePagePreview);
CMS.registerPreviewTemplate('legal', LegalPagePreview);

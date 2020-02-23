import Home from '../pages/HomePage';
// import Package from './pages/Package';
// import Pattern from './pages/Pattern';
import Document from '../pages/Document';
import FourOhFour from '../pages/FourOhFour';
//import FAQ from '../pages/TablePage';
import FAQ from '../pages/FAQTable';
// import PackagesList from './pages/PackagesList';
// import PatternsInfo from './pages/PatternsInfo';
// import PackageDocument from './pages/PackageDocument';
// import ChangeLogExplorer from './pages/ChangeLogExplorer';
// import ChangelogModal from './pages/Package/ChangelogModal';
// import ExamplesModal from './pages/Package/ExamplesModal';
const home = [
    {
        exact: true,
        path: '/',
        component: Home,
    },
];
const table = [
    {
        exact: true,
        path: '/faqs',
        component: FAQ,
    },
]
const staticDocs = [
    {
        path: '/docs/:docId*',
        component: Document,
    },
];
/**
 * We do not support patterns on the current website
 * This exist as part of the migration from old build
 * Keeping it here for reference
 */
// @ts-ignore pattern is here for reference, it is not used on website anywhere
// const patterns = [
//     { path: '/patterns/:patternId*', component: Pattern },
//     {
//         path: '/patterns',
//         component: PatternsInfo,
//         exact: true,
//     },
// ];
// const packagesDocs = [
//     { path: '/packages/:groupId/:pkgId/docs/:docId', component: PackageDocument },
//     { path: '/packages/:groupId/:pkgId', component: Package },
//     {
//         path: '/packages',
//         component: PackagesList,
//     },
// ];
// const examples = [
//     {
//         path: '/packages/examples',
//         component: ({ location }) => (<Redirect to={location.pathname.replace('/examples', '')}/>),
//     },
// ];
// const changelogs = [
//     { path: '/changelog/:groupId/:pkgId/:semver?', component: ChangeLogExplorer },
// ];
// const fourOhFour = [
//     {
//         path: '/error',
//         component: FourOhFour,
//     },
// ];
// const redirects = [
//     {
//         path: '/mk-2',
//         render: (props) => (<Redirect to={props.location.pathname.replace('/mk-2', '')}/>),
//     },
//     {
//         path: '/components',
//         render: (props) => (<Redirect to={props.location.pathname.replace('/components', '/packages/core')}/>),
//     },
// ];
export const pageRoutes = [
    //...redirects,
    ...home,
    ...table,
    ...staticDocs,
    // ...packagesDocs,
    // ...examples,
    // ...changelogs,
    // ...fourOhFour,
    // fallback url in case there are no matches
    {
        component: FourOhFour,
    },
];
// const changelogModal = [
//     {
//         path: '/packages/:groupId/:pkgId/changelog/:semver?',
//         children: (props) => (<ModalTransition>
//         {props.match && <ChangelogModal {...props}/>}
//       </ModalTransition>),
//     },
// ];
// const examplesModal = [
//     {
//         path: '/packages/:groupId/:pkgId/example/:exampleId',
//         children: (props) => (<ModalTransition>
//         {props.match && <ExamplesModal {...props}/>}
//       </ModalTransition>),
//     },
// ];
// export const modalRoutes = [...changelogModal, ...examplesModal];

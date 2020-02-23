// SITE_DATA is dynamically generated at runtime by bolt-fs-loader.
// Configuration for bolt-fs-loader is in webpack.config.js since it needs to be dynamically created
// depending on the subset of packages we want to represent on the website.
// @ts-ignore: Those data are populated at run-time and it is not possible to declare those file in typescript.
import data from './SITE_DATA';
// @ts-ignore: Those data are populated at run-time and it is not possible to declare those file in typescript.
import NAV_DATA from './NAV_DATA';
import * as fs from './utils/fs';
const productPackages = ['bitbucket', 'jira', 'trello'];
const siteData = data;
export default siteData;
//const dirs = fs.getDirectories(data.children);
const dirs = ['guides']
function isInternal(groupId, pkgId) {
    const pkgInfo = NAV_DATA[groupId].find((a) => a.name === pkgId);
    return (pkgInfo &&
        pkgInfo.config &&
        pkgInfo.config.atlaskit &&
        pkgInfo.config.atlaskit.internal);
}
const publicPackages = {
    type: 'dir',
    id: 'packages',
    children: [],
};
//const packageDirs = fs.getById(dirs, 'packages');
// for (const child of fs.getDirectories(packageDirs.children)) {
//     const children = child.children.filter(pkg => !isInternal(child.id, pkg.id));
//     if (children.length > 0)
//         publicPackages.children.push(Object.assign({}, child, { children }));
// }
/* If a package is related to an Atlassian products, it will appear at the bottom of the navigation */
// let productsPkgs = [];
// let non_productsPkgs = [];
// for (let pkg of publicPackages.children) {
//     if (productPackages.includes(pkg.id))
//         productsPkgs.push(pkg);
//     else
//         non_productsPkgs.push(pkg);
// }
// publicPackages.children = non_productsPkgs.concat(productsPkgs);
// export const getConfig = (groupId, pkgId) => {
//     return (NAV_DATA[groupId] &&
//         NAV_DATA[groupId].find((pkg) => pkg.name === pkgId));
// };
export const docs = '/docs/';
//export const packages = fs.getById(dirs, 'packages');
//export const externalPackages = publicPackages;
//export const pkgData = NAV_DATA;
export const patterns = fs.maybeGetById(dirs, 'patterns') || {
    type: 'dir',
    id: 'patterns',
    children: [],
};

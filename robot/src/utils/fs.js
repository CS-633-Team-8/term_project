import { sentenceCase } from 'sentence-case';

export function getDirectories(items) {
    const dirs = [];
    for (const item of items) {
        if (item.type === 'dir') {
            dirs.push(item);
        }
    }
    return dirs;
}
export function getFiles(items) {
    const files = [];
    for (const item of items) {
        if (item.type === 'file') {
            files.push(item);
        }
    }
    return files;
}
export function maybeGetById(items, id) {
    return items.find(item => item.id === id) || null;
}
export function getById(items, id) {
    console.log(items, id)
    const match = maybeGetById(items, id);
    if (!match) {
        throw new Error(`Missing ${id} in file system`);
    }
    return match;
}
export function flatMap(dir, iteratee) {
    const result = [];
    function visit(dir, filePath) {
        for (const item of dir.children) {
            const currPath = `${filePath}/${item.id}`;
            if (item.type === 'dir') {
                visit(item, currPath);
            }
            else {
                result.push(iteratee(item, currPath));
            }
        }
    }
    visit(dir, dir.id);
    return result;
}
export function find(dir, iteratee) {
    function visit(dir, filePath) {
        for (const item of dir.children) {
            const currPath = `${filePath}/${item.id}`;
            if (iteratee(item, currPath)) {
                return item;
            }
            else if (item.type === 'dir') {
                const result = visit(item, currPath);
                if (result)
                    return result;
            }
        }
        return undefined;
    }
    return visit(dir, dir.id) || null;
}
export function findNormalized(dir, filePath) {
    return find(dir, (file, currPath) => {
        return normalize(currPath) === filePath;
    });
}
export function findNormalizedDir(dir, filePath) {
    let dir2 = find(dir, (file, currPath) => {
        return normalize(currPath) === filePath;
    });
    if (dir2 && dir2.type !== 'dir')
        return null;
    else
        return dir2;
}
export function normalize(filePath) {
    return filePath
        .split('/')
        .map(part => {
        return part.replace(/^[\d]+-/, '');
    })
        .join('/')
        .replace(/\..*/, '');
}
export function titleize(filePath) {
    return sentenceCase(normalize(filePath));
}
export function isFile(file) {
    return !!(file && file.contents);
}
export function isChildren(file) {
    return !!(file && file.children);
}

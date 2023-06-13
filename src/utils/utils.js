const compareArrays = (arr1, arr2, id) => {
    const added = arr2.filter(item2 => !arr1.find(item1 => item1[id] === item2[id]));
    const deleted = arr1.filter(item1 => !arr2.find(item2 => item2[id] === item1[id]));
    const updated = arr2.filter(item2 => {
        const matchedItem = arr1.find(item1 => item1[id] === item2[id]);
        return matchedItem && !compareObjects(matchedItem, item2);
    });

    return { added, deleted, updated };
}

const compareObjects = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (let key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export {
    compareArrays, compareObjects
}
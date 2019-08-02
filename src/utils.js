export class FormJsonValidator {
    static validate(json) {
        const validateItemGroup = items => {
            return items.reduce((accumulator, item) => {
                if(! accumulator) return accumulator

                if(! ('type' in item) || ['question', 'section'].indexOf(item.type) === -1) {
                    return false
                }

                if(! ('uuid' in item && 'type' in item)) {
                    return false
                }

                if(item.type === 'question') {
                    if(! ('title' in item)) {
                        return false
                    }
                }

                if(item.type === 'section') {
                    if(! ('items' in item)) {
                        return false
                    }

                    if(! Array.isArray(item.items)) {
                        return false
                    }

                    return validateItemGroup(item.items)
                }

                return true
            })
        }

        if(! ('uuid' in json && 'type' in json && 'items' in json)) {
            return false
        }

        if(! json.type === 'form') {
            return false
        }

        if(! Array.isArray(json.items)) {
            return false
        }

        return json.items.reduce((accumulator, page) => {
            if(! accumulator) return accumulator

            if(! ('uuid' in page && 'type' in page && 'items' in page)) {
                return false
            }

            if(! page.type === 'page') {
                return false
            }

            if(! Array.isArray(page.items)) {
                return false
            }

            return validateItemGroup(page.items)
        }, true)
    }
}

export const downloadJson = json => {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json, null, 2));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}
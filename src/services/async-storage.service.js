export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 500) {
    try {
        const entities = JSON.parse(localStorage.getItem(entityType)) || [];
        return new Promise(resolve => setTimeout(() => resolve(entities), delay));
    } catch (err) {
        console.error(`Error parsing data for ${entityType}:`, err);
        return Promise.reject(err);
    }
}


async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) {
            throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`);
        }
        return entity
    } catch (err) {
        if (err.message.includes('Get failed')) {
            throw err
        }
        throw new Error(`Query failed for ${entityType}: ${err.message}`, { cause: err });
    }
}


async function post(entityType, newEntity) {
    try {
        const entities = await query(entityType)
        const savedEntity = { ...newEntity, _id: _makeId() }
        entities.push(savedEntity)
        _save(entityType, entities)
        return savedEntity
    } catch (err) {
        throw new Error(`Query failed for ${entityType}: ${err.message}`, { cause: err });
    }
}

async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) {
            throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`);
        }
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    } catch (err) {
        throw new Error(`Query failed for ${entityType}: ${err.message}`, { cause: err });
    }
}

async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (err) {
        throw new Error(`Query failed for ${entityType}: ${err.message}`, { cause: err });
    }
}

// Private functions

function _save(entityType, entities) {
    try {
        localStorage.setItem(entityType, JSON.stringify(entities))
    } catch (err) {
        throw new Error(`Query failed for ${entityType}: ${err.message}`, { cause: err });
    }
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}
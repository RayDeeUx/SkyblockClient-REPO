import axios from 'axios'
import fs from 'fs'

const useLocalRepo = true

async function getRepo(thingToGet: string) {
    if (useLocalRepo) { return JSON.parse(fs.readFileSync(`SkyblockClient-REPO/files/${thingToGet}`, 'utf-8')) }
    else { return await (await axios.get(`https://raw.githubusercontent.com/nacrt/SkyblockClient-REPO/main/files/${thingToGet}`)).data }
}

export default {
    getRepo
}
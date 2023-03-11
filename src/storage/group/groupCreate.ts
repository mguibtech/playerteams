import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupGetAll";

export async function groupCreate(newGroupName: string){
    try{

        const storageGroups = await groupsGetAll();

        const groupAlredyExists = storageGroups.includes(newGroupName)

        if(groupAlredyExists){
            throw new AppError(`O nome ${newGroupName} já existe`)
        }

        const storage = JSON.stringify([...storageGroups, newGroupName])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)

    }catch (error){
        throw error;
    }
}
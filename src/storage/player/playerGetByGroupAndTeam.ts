import { playersGetByGroup } from "./playersGetByGroup";

export async function playersGetByGroupAndTeam(group: string, team: string) {
    try{
        const sotorage = await playersGetByGroup(group);

        const players = sotorage.filter(player => player.team === team)
        return players;
    }catch(error){
        throw error
    }
}
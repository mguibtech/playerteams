import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { Container, Content, Icon } from "./styles";
import {useNavigation} from '@react-navigation/native'
import { useState } from "react";

export function NewGroup(){

    const [group, setGroup] = useState('')

    const navigation = useNavigation();

    function handleNew(){
        navigation.navigate('players', { group })
    }

    return(
        <Container>
           <Header showBackButton /> 
            <Content>
                <Icon/>
                <Highlight 
                    title="Nova turma" 
                    subtitle="Crie a turma para adicionar participantes"
                />
                <Input 
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                />
                <Button onPress={handleNew} title="Criar" style={{marginTop:20}}/>
            </Content>
        </Container>
    )
}
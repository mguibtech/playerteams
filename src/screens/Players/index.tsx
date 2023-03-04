import { ButtonIcon } from "@components/ButtonIcon";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container } from "./styles";

export function Players(){
    return(
        <Container>
            <Header showBackButton/>

            <Highlight 
                title="Nome da turma"
                subtitle="Adicione a galera e serapre os times" 
            />

            <ButtonIcon/>

            
        </Container>
    )
}
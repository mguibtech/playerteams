import { Container, SubtTitle, Title } from "./styles";

type Props ={
    title: string;
    subtitle: string;
}

export function Highlight({title, subtitle} : Props){
    return(
        <Container>
            <Title>{title}</Title>
            <SubtTitle>{subtitle}</SubtTitle>
        </Container>
    )
}
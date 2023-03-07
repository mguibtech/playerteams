import { Container, FilterStyleProps, Title } from "./styles";
import {TouchableOpacityProps} from 'react-native'

type Props = TouchableOpacityProps & FilterStyleProps & {
    title: string;
}

export function Filter({title, isActive = false, ...rest} : Props){
    return(
        <Container 
            {...rest}
            isActive={isActive}
            >
            <Title>
                {title}
            </Title>
        </Container>
    )
}
import { TouchableOpacityProps } from 'react-native';
import {MaterialIcons} from '@expo/vector-icons'
import { ButtonIconTypeStyleProps, Container, Icon } from './styles';

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  type? : ButtonIconTypeStyleProps;
}

export function ButtonIcon({type = 'PRIMARY', icon, ...rest}: Props) {
  return(
    <Container {...rest}>
      <Icon 
        name={icon} 
        type={type} />
    </Container>
  );
}
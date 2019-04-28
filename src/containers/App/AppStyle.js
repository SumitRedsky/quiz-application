import { Platform } from 'react-native';

const styles = {
    Container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 22 : null,
        backgroundColor:'#FFFFFF'
    }
}

export default styles;
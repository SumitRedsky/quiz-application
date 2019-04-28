
const styles = {
    ImageBackgroundStyle: {
        flex: 1,
        height: null,
        width: '100%'
    },
    TopicHeader: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TopicHeaderText: {
        fontSize: 15,
        fontWeight: "500",
        color: "#383838",
        textTransform: "uppercase"
    },
    ListItem: {
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.8)',
        flexDirection: 'row',
        borderRadius: 10
    },
    QuestionContainer: {
        flex: 1,
    },
    QuestionTextContainer: {
        flexDirection: 'row',
        width: "90%"
    },
    QuestionText: {
        fontSize: 17,
        fontWeight: "500",
        color: "#383838"
    },
    QuestionImageContainer: {
        marginTop: 10,
        paddingVertical: 5,
        alignItems: 'center',
    },
    QuestionImage: {
        width: 80,
        height: 80,
        resizeMode: 'stretch',
        marginLeft: 30
    },
    AnswerTextHeading: {
        color: '#34d4a2',
        fontSize: 15,
        lineHeight: 19,
    },
    AnswerText: {
        width: "50%",
        color: '#383838',
        fontSize: 15,
        lineHeight: 19,
    }
}
export default styles;
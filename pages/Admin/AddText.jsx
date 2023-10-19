import React, {useState} from "react";
import {View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";

const AddText = ({navigation}) => {

    const [searchTerm, setSearchTerm] = useState('');

    return(
        <View>
            <Text style={{textAlign:"center", marginTop:72, fontSize:24, fontWeight:'bold'}}>Add Text</Text>
            <TextInput
                placeholder="Add Text"


                style={styles.searchInput}
            />
            <TouchableOpacity
                style={styles.addButton}

            >
                <Text style={styles.addButtonText}>Add Text</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

    addButton:{
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical:10,
        marginBottom: 16,
        backgroundColor: "#004AAD",
        marginHorizontal:10
    },
    addButtonText:{
        color:"white",
        textAlign:"center",
        fontWeight:"bold"
    },
    searchInput: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop:36,
        marginHorizontal:10
    },

});

export default AddText;

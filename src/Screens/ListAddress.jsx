import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AddButton from "../Components/AddButton";
import AddressItem from '../Components/AddressItem'
import { useGetUserLocationQuery } from "../Services/shopServices";

const ListAddress = ({ navigation }) => {
  const { location, localId } = useSelector((state) => state.userReducer.value);
  const { data: userLocationQuery, isError, isLoading } = useGetUserLocationQuery(localId);

  const addressExists = location && location.latitude;
  const userLocationExists = userLocationQuery && !isError && !isLoading;

  if (addressExists || userLocationExists) {
      const selectedLocation = addressExists ? location : userLocationQuery;
      return <AddressItem location={selectedLocation} navigation={navigation} />;
  } else {
      return (
          <View style={styles.container}>
              <Text style={styles.text}>No location set</Text>
              <AddButton
                  title="Set location"
                  onPress={() => navigation.navigate("Location Selector")}
              />
          </View>
      );
  }
};

export default ListAddress;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    text: {
        paddingVertical: 20,
        fontFamily: 'Josefin',
        fontSize: 18
    }
});

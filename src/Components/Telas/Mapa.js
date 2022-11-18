import React, { Component } from "react";
import { View } from "react-native";

import MapView from "react-native-maps";

export default Mapa = () => {
      
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <MapView
                    style={{width: '60%', height: '60%'}}
                />
            </View>
        );
}
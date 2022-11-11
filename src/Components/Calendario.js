import { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function Calendario (data, action) {

    LocaleConfig.locales['br'] = {
        monthNames: [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        ],

        monthNamesShort: [
            'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
            'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
        ],

        dayNames: [
            'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
            'Quinta-feira', 'Sexta-feira', 'Sabado', 
        ],

        dayNamesShort: [
            'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab',
        ],

        today: 'hoje',
    };
    
    LocaleConfig.defaultLocale = 'br';

    return (
        <View>
            <Calendar
                initialDate={data}
                enableSwipeMonths={true}
                onDayPress={(day)=>{
                    action(day.dateString);
                }}
            />
        </View>
    )
}
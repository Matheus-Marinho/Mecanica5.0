import qs from 'qs';
import { Linking } from 'react-native';

export async function EnviarEmail(to, subject, body, options = {}){
    const { cc, bcc } = options;
    let url = `mailto:${to}`;

    const query = qs.stringify({
        subject: subject,
        body: body,
        cc: cc,
        bcc: bcc
    });

    if(query.length){
        url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);
    if(!canOpen){
        throw new Error('A url fornecida não pode ser tratada!')
    }

    return Linking.openURL(url);

};
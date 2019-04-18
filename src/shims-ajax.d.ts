import axios, { AxiosInstance } from 'axios';
import VueI18n, {IVueI18n} from 'vue-i18n';


declare module 'Vue/types/vue' {
    interface Vue {
        $ajax: any;
    }
}


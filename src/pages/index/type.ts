import {RequestSchema} from '../../../server/routes/request/schema/request';
import {AjaxFormData} from '../../components/form/type';


export type OrderData = AjaxFormData & Pick<RequestSchema, 'amount' | 'mobile' | 'name'>;

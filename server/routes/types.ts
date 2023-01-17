import {NextApiRequest as InternalNextApiRequest, NextApiResponse} from 'next';


export type NextApiRequest<T = any> = Omit<InternalNextApiRequest, 'body'> & {
  body: T
};

export type NextApiRoute<T = any, R = any> = (req: NextApiRequest<T>, res: NextApiResponse<R>) => Promise<void>;

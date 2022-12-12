// import { NextApiRequest, NextApiResponse } from 'next';

// module.exports = (fn: Function) => {
//     return (req: NextApiRequest, res: NextApiResponse) => {
//         fn(req, res).catch();
//     };
// }

export default (fn: Function) => {
  return (...props) => {
    fn(props).catch((error) => {
      console.log("/utils/catchAsync", fn, error);
      throw new Error("Oops, something when wrong!");
    });
  };
};

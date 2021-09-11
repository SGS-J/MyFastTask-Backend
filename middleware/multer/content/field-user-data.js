import multer from 'multer';

const upload = multer();
export default () => {
   return upload.any([
      'username',
      'password',
      'conf-password',
      'birthday',
      'gender',
      'UIColor',
      'avatar',
   ]);
};

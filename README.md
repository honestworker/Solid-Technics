# Solid-Technics

## Installation
- Upload the source code on the root directory of the server.
- Go to the website domain on the browser. You will see the installation.
- Input the values of the form and click "Submit" button.
- These configurations will be written on .env file at the install step.
    - SITE_NAME: Website name  
    - DB_HOST: Database host name  
    - DB_NAME: Database name  
    - DB_USER: Database user name  
    - DB_PASSWORD: Database user password  
- After installation, you can login as admin with this credential.  
    - name: admin, password: password

## Configuration
- If you want the change the configuration, please open .env file and edit it.  
    - DOMAIN_NAME: Website domain root url.  
    - DOMAIN_ROOT: Website main directory path.  
    - MEDIA_PATH: Media direcoty name for the media of the user.  
    - UPLOADS_PATH: Upload direcotry name. The importing file will be stored on this direcotry.  
    - LOGO_NAME: Logo name of the user.  
    - LOGO_ALLOWS: Available extensions for logo.  
    - LOGO_MAX_SIZE: Logo max size(unit: MB).  
    - LOGO_MAX_WIDTH: Logo max width(unit: px).  
    - PIC_ALLOWS: Available extensions for the product pictures.  
    - PIC_MAX_SIZE: Product pictures max size(unit: MB).  
    - PIC_MAX_WIDTH: Product pictures max width(unit: px).  
    - VIDEO_ALLOWS: Available extensions for the product videos.  
    - EXPORT_PRODUCT: Products export file name.  
    - IMPORT_USER_PASSWORD: The default password on the importing of the users.  
    - TRANSPARENT_PNG_PATH: Transparent png file path if the product pictures will be none.  
    - TRANSPARENT_PNG_NAME: Transparent png file name if the product pictures will be none.  
    - STAR1_LIMIT: Media limit size for the 'star1' users(unit: MB).  
    - STAR2_LIMIT: Media limit size for the 'star2' users(unit: MB).  
    - STAR3_LIMIT: Media limit size for the 'star3' users(unit: MB).  
    - STAR4_LIMIT: Media limit size for the 'star4' users(unit: MB).  
    - STAR5_LIMIT: Media limit size for the 'star5' users(unit: MB).  

### Template
https://filemanager.veno.it/
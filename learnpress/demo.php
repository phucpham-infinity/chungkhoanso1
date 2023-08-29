<?php

class Cks1Admin{
    public function __construct() {
        add_action('admin_menu', array($this,'settingMenu'));
        add_action( 'admin_head',  array($this,'addScriptHeader') );
    }
    
    public function addScriptHeader(){
        if($_GET['page'] ==='cks1-app-student-manager'){
            echo '
             <link href="https://unpkg.com/primevue@^3/resources/themes/saga-blue/theme.css" rel="stylesheet" />
            <link href="https://unpkg.com/primevue@^3/resources/primevue.min.css" rel="stylesheet" />
            <link href="https://unpkg.com/primeflex@^3/primeflex.min.css" rel="stylesheet" />
            <link href="https://unpkg.com/primeicons/primeicons.css" rel="stylesheet" />
            ';
            
        }
      
    }
    
    public function settingMenu(){
        $menuTitle ='Quản lý học viên';
        $menuSlug= 'cks1-app-student-manager';
        add_menu_page( $menuTitle, $menuTitle ,'manage_options',$menuSlug,array($this,'settingPage'), PLUGIN_PATH . '/images/graduation_white_filled_16x16.png');
    }
    
    public function settingPage(){
        require_once dirname(__FILE__) . '/admin.view.php';
    }
    
}
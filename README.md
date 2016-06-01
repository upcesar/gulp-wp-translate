# GULP WP Translate

Task runner written in Javascript GULP for building POT files (Translation Template Files), which are used in WP Themes and Plugins.

The task reads PHP files recursively in WP Themes / Plugins folder and subfolder, catching the following functions within each file:

- translate()
- __()
- _e()
- _n()
- _x()
- _ex()
- _nx()
- esc_attr__()
- esc_attr_e()
- esc_attr_x()
- esc_html__()
- esc_html_e()
- esc_html_x()
- _n_noop()
- _nx_noop()
- translate_nooped_plural()


##The concept

Wordpress uses the .po (portable object) and .pot (portable object template) extensions for the translation files. These use the GNU Gettext format. The basic difference between these file formats is that .pot files are simply templates which contain no translations while .po files do.

**PO files**

PO files are the files which contain the actual translations. Each language will have its own PO file, for example, for Brazilian Portuguese there would be a pt-BR.po file, for Venezuelan Spanish would be es-VE, for german there would be a de.po, for American English there might be en-US.po and so on. You can even use po files to customize the displayed text without changing the code, by for example, creating an adapted file such as en-my_company.po.

The core of each PO file is very simple; it is made of simply pairs of the source text - that which is found in the code - and target text, the text which is wanted in the translation. For example, in the French PO file you might have a translation of a string as follows:

- `msgid "Hello world"`
- `msgstr "Olá mundo"`

The msgid contains the text actually in the code, and the msgstr contains the text into which it is translated. If there is no translation given in the msgstr, then the default msgid string will be displayed.

PO files are simply text files and can thus be edited by any text editor, but there are also many tools available to make editing them easier.

**POT files**

POT files are basically the template files for PO files (Warning: Microsoft also uses POT as the extension for PowerPoint template files, but these are not the same). They will have all the translation strings (the msgstr parts) left empty, for example:

- `msgid "Hello world"`
- `msgstr ""`

The Protuguese PO file (pt-BR.po) is then simply a copy of the POT file but with the translations filled in. 


## Instalation

- Download and install Node Package Manager (NPM). Here is the link for download and install according to your OS: https://nodejs.org/ 
- Open terminal windows.
- Goto WP root project folder. Example: `cd /folder/my_wp_site`
- Clone the repo using git command: `git clone git@github.com:upcesar/gulp-wp-translate.git ./` for putting files into WP root project.
- Execute `npm install --save-dev` for installing dependencies listed in file `package.json`

## Use

**Create a single file:**

Execute `gulp translate --domain=[translation domain] --scr=[path_type_name]`

Parameters:

- [translation domain] : Project / domain translation name for WP theme or plugin
- [path_type_name]     : Set whether a translation is applied to WP "themes" or "plugins" from WordPress path (wp-content/[path_type_name]/)

**Create all files based on array elements':**

- Setup array as follows in line 101:

`var translates = [
		{ src: "themes",   domain: "my_theme_folder_1" },
		{ src: "themes",   domain: "my_theme_name_2" },
		{ src: "plugins",  domain: "my_plugin_name_1" },
		{ src: "plugins",  domain: "my_plugin_name_2" }		
  	];`

- Execute `gulp translate-all`


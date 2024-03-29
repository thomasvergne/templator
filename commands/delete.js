import PATH from 'path'
import { Permissions } from 'discord.js'

export default {

    name        : 'delete',
    description : 'Permet réinitialiser le serveur : t!delete',
    category    : '• Utilitaire',

    run         : class {

        constructor (client, message, args) {

            this.client  = client
            this.message = message
            this.args    = args

        }

        command () {
            
            this.message.guild.channels.forEach(channel => channel.delete())
            this.message.guild.roles.forEach(role => {
                if (!['@everyone', 'Templator'].includes(role.name)) {
                    role.delete().catch(error => console.log(role))
                }
            })

        }

    }

}

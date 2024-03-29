import Discord from 'discord.js'
import Config  from '../config'

export default {

    name        : 'help',
    description : 'Affiche la page d\'aide du bot : t!help',
    category    : '• Général',

    run         : class {

        constructor (client, message, args) {

            this.client     = client
            this.message    = message
            this.args       = args,
            this.categories = {}

        }

        command () {
            const embed = new Discord.RichEmbed()
                                     .setFooter('Demandé par ' + this.message.author.username, this.message.author.avatarURL)
                                     .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            if (this.args.length > 0) {
                const text = this.args.length > 1 ? 'Commandes cherchées' : 'Commande cherchée'
                this.args  = this.args.map(x => x.startsWith(Config.prefix) ? x = x.replace(Config.prefix, '') : x)
                console.log(this.args)
                embed.setTitle('Page d\'aide')
                     .setDescription(text + ' : ' + this.args.join(', '))
                for (const command of this.args) {
                    const COMMAND = this.client.commands.get(command)
                    let   name    = COMMAND.name,
                          element = COMMAND.description.split(':').map(x => x.trim()),
                          desc    = element[0],
                          cmd     = element[1]

                    if (!name) name = 'Aucun nom pour cette commande.'
                    if (!desc) desc = 'Aucune description pour cette commande.'
                    if (!cmd)  cmd  = 'Aucune commande.'
                    
                    embed.addField(`t!${name}`, desc + '\n```' + cmd + '```', true)
                }

            } else {
                embed.setTitle('Page d\'aide')
                     .setDescription('Affiche la page d\'aide du bot')
                for (const command of this.client.commands) {
                    const COMMAND = command[1]
                    let   name    = COMMAND.name
    
                    if (!name) name = content[file].split('.')[0]
                    if (!this.categories[COMMAND.category]) this.categories[COMMAND.category] = []
                    this.categories[COMMAND.category].push(name)
                }
                
                for (const category in this.categories) {
                    embed.addField(category + ' : ' + (this.categories[category].length > 1 ? this.categories[category].length + ' commandes' : this.categories[category].length + ' commande'), this.categories[category].map(x => '```' + x + '```').join(' '))
                }
            }

            this.message.channel.send(embed)

        }

    }

}

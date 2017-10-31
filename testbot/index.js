/*
  CONGRATULATIONS on creating your first Botpress bot!

  This is the programmatic entry point of your bot.
  Your bot's logic resides here.
  
  Here's the next steps for you:
  1. Read this file to understand how this simple bot works
  2. Read the `content.yml` file to understand how messages are sent
  3. Install a connector module (Facebook Messenger and/or Slack)
  4. Customize your bot!

  Happy bot building!

  The Botpress Team
  ----
  Getting Started (Youtube Video): https://www.youtube.com/watch?v=HTpUmDz9kRY
  Documentation: https://botpress.io/docs
  Our Slack Community: https://slack.botpress.io
*/

const options = {
    quick_replies: [
        {
            content_type: "text",
            title: "Yes send me an image",
            payload: "image"
        }
    ],
    typing: true,
    waitRead: true
}

const waitRead = {
    waitRead: true,
    typing: true
}

module.exports = function(bp) {

    bp.hear(/GET_STARTED|hello|hi|test|hey|holla/i, (event, next) => {
        event.reply('#welcome')
    })

    bp.hear('WELCOME.B1', (event, next) => {
        event.reply('#choose_img')
    })

    bp.hear('CHOOSE_IMG.B1', (event, next) => {
        event.reply('#img_desc', { img_type: 'dog' })
        bp.messenger.sendAttachment(event.user.id, 'image', 'https://source.unsplash.com/random/1000x1000/?dog,dogs') 
    })

    bp.hear('CHOOSE_IMG.B2', (event, next) => {
        event.reply('#img_desc', { img_type: 'cat' })
        bp.messenger.sendAttachment(event.user.id, 'image', 'https://source.unsplash.com/random/1000x1000/?cat,cats') 
    })

    bp.hear('CHOOSE_IMG.B3', (event, next) => {
        event.reply('#img_desc', { img_type: 'random'})
        bp.messenger.sendAttachment(event.user.id, 'image', 'https://source.unsplash.com/random/1000x1000/') 
    })

    bp.hear('WELCOME.B2', (event, next) => {
        event.reply('#welcome_neg_reply')
    })

   bp.hear({'nlp.source': 'agent' }, (event, next) => {
        if (event.nlp.fulfillment.speech == 'json') {
            event.reply('#img_desc', { img_type: 'random' })
            bp.messenger.sendAttachment(event.user.id, 'image', 'https://picsum.photos/1000/1000/?random')
        }
        else {
            bp.messenger.sendText(event.user.id, event.nlp.fulfillment.speech)
        }
        
    })

   /*  bp.hear({ 'nlp.source': 'domains' }, (event, next) => {
        event.reply('#variable', { answer: event.nlp.fulfillment.speech })
    }) */

    //console.log('bp started');
}

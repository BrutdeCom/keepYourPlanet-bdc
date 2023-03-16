import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import DividerLayout from './layout/DividerLayout'

const useStyles = makeStyles(() => ({
  title: {
    textAlign: 'center',
    paddingBottom: '3vh',
    paddingTop: '4vh'
  },
}))

const ArticleSubTitle = (props) => {
  return (
    <Typography variant="h5" component="h3" style={{ marginBottom: '3vh', marginTop: '4vh', marginLeft: '1vh' }}>
      {props.children}
    </Typography>
  )
}

const TextContent = (props) => {
  return (
    <Typography variant="body1" style={{ marginLeft: '2vh' }}>
      {props.children}
    </Typography>
  )
}

const PrivacyPolicy = () => {
  const classes = useStyles()
  return (
    <>
      <Typography variant="h3" component="h2" className={classes.title}>
          POLITIQUE DE CONFIDENTIALITE
      </Typography>
      <DividerLayout />
      <ArticleSubTitle>
          ARTICLE 1 : PRÉAMBULE
      </ArticleSubTitle>
      <TextContent>
          Cette politique de confidentialité s’applique au site : keepyourplanet.fr. <br/>
 
          La présente politique de confidentialité a pour but d’exposer aux utilisateurs du site :<br/>
          La manière dont sont collectées et traitées leurs données à caractère personnel. <br/>
          Doivent être considérées comme données personnelles toutes les données étant susceptibles d’identifier un utilisateur. Il s’agit notamment du prénom et du nom, de l’âge, de l’adresse postale, l’adresse mail, la localisation de l’utilisateur ou encore son adresse IP;<br/>
          Quels sont les droits des utilisateurs concernant ces données ;<br/>
          Qui est responsable du traitement des données à caractère personnel collectées et traitées ;<br/>
          A qui ces données sont transmises ;<br/>
          Eventuellement, la politique du site en matière de fichiers « cookies ».
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 2 : PRINCIPES GÉNÉRAUX EN MATIÈRE DE COLLECTE ET DE TRAITEMENT DE DONNÉES
      </ArticleSubTitle>
      <TextContent>
          Conformément aux dispositions de l’article 5 du Règlement européen 2016/679, la collecte et le
          traitement des données des utilisateurs du site respectent les principes suivants : <br/><br/>
 
          Licéité, loyauté et transparence : les données ne peuvent être collectées et traitées qu’avec le
          consentement de l’utilisateur propriétaire des données. A chaque fois que des données à
          caractère personnel seront collectées, il sera indiqué à l’utilisateur que ses données sont
          collectées, et pour quelles raisons ses données sont collectées ;<br/>
          Finalités limitées : la collecte et le traitement des données sont exécutés pour répondre à un ou
          plusieurs objectifs déterminés dans les présentes conditions générales d’utilisation ;<br/>
          Minimisation de la collecte et du traitement des données : seules les données nécessaires à la
          bonne exécution des objectifs poursuivis par le site sont collectées ;<br/>
          Conservation des données réduites dans le temps : les données sont conservées pour une durée
          limitée, dont l’utilisateur est informé. Lorsque cette information ne peut pas être communiquée,
          l’utilisateur est informé des critères utilisés pour déterminer la durée de conservation ;<br/>
          Intégrité et confidentialité des données collectées et traitées : le responsable du traitement des
          données s’engage à garantir l’intégrité et la confidentialité des données collectées.<br/>
          Afin d’être licites, et ce conformément aux exigences de l’article 6 du règlement européen 2016/679, la
          collecte et le traitement des données à caractère personnel ne pourront intervenir que s’ils respectent au
          moins l’une des conditions ci-après énumérées :<br/><br/>
 
          L’utilisateur a expressément consenti au traitement ;<br/>
          Le traitement est nécessaire à la bonne exécution d’un contrat ;<br/>
          Le traitement répond à une obligation légale ;<br/>
          Le traitement s’explique par une nécessité liée à la sauvegarde des intérêts vitaux de la personne
          concernée ou d’une autre personne physique ;<br/>
          Le traitement peut s’expliquer par une nécessité liée à l’exécution d’une mission d’intérêt public
          ou qui relève de l’exercice de l’autorité publique ;<br/>
          Le traitement et la collecte des données à caractère personnel sont nécessaires aux fins des
          intérêts légitimes et privés poursuivis par le responsable du traitement ou par un tiers.<br/>
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 3 : DONNÉES À CARACTÈRE PERSONNEL COLLECTÉES ET TRAITÉES DANS LE CADRE DE LA NAVIGATION SUR LE SITE<br/>
          A. DONNÉES COLLECTÉES ET TRAITÉES ET MODE DE COLLECTE
      </ArticleSubTitle>
      <TextContent>
          Les données à caractère personnel collectées sur le site KeepYourPlanet sont les suivantes :<br/><br/>
 
          – Adresse mail;<br/>
          - Données portant sur le véhicule : marque, modèle, carburant, année et émission de CO2, si vous avez renseigné ces informations dans votre compte client.<br/>
          - Données du véhicule : plaque d’immatriculation, si vous nous l’avez communiquée.<br/><br/>

          Ces données sont collectées lorsque l’utilisateur effectue l’une des opérations suivantes sur le site :<br/><br/>
 
          – Les données transmises directement :<br/><br/>
          Ces données sont celles que vous nous transmettez directement, via un formulaire de contact ou
          bien par contact direct par email, ainsi qu'à l'inscription sur le site. Et également lors du remplissage de votre profil, ou de l'ajout d'une évaluation. Sont obligatoires dans le formulaire de d'inscription les champs 
          « email ».<br/><br/>
 
          Le responsable du traitement conservera dans ses systèmes informatiques du site et dans des
          conditions raisonnables de sécurité l’ensemble des données collectées pour une durée de : 13 mois
          maximum.<br/><br/>
 
          La collecte et le traitement des données répondent aux finalités suivantes :<br/><br/>
 
          Les données que vous nous transmettez directement sont utilisées dans le but de vous re-contacter
          et/ou dans le cadre de la demande que vous nous faites et dans l'utilisation basique du site. Ces données sont utilisées par
          KeepYourPlanet, responsable du traitement des données, et ne seront jamais cédées à un tiers ni
          utilisées à d’autres fins que celles détaillées ci-dessus.
      </TextContent>
      <ArticleSubTitle>
          B. TRANSMISSION DES DONNÉES A DES TIERS
      </ArticleSubTitle>
      <TextContent>
          Les données à caractère personnel collectées par le site ne sont transmises à aucun tiers, et ne sont
          traitées que par l’éditeur du site.
      </TextContent>
      <ArticleSubTitle>
          C. HÉBERGEMENT DES DONNÉES
      </ArticleSubTitle>
      <TextContent>
          Le site KeepYourPlanet est hébergé par : , <br/>
          dont le siège est situé à l’adresse ci-après : <br/>
          L’hébergeur peut être contacté au numéro de téléphone suivant : <br/>
          Les données collectées et traitées par le site sont exclusivement hébergées et traitées en France.
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 4 : RESPONSABLE DU TRAITEMENT DES DONNÉES<br/>
          A. LE RESPONSABLE DU TRAITEMENT DES DONNÉES 
      </ArticleSubTitle>
      <TextContent>
          Le responsable du traitement des données à caractère personnel est : KeepYourPlanet. Il peut être contacté
          de la manière suivante : <br/>
          Par mail : <br/>
          Le responsable du traitement des données est chargé de déterminer les finalités et les moyens mis au
          service du traitement des données à caractère personnel.
      </TextContent>
      <ArticleSubTitle>
          B. OBLIGATIONS DU RESPONSABLE DU TRAITEMENT DES DONNÉES 
      </ArticleSubTitle>
      <TextContent>
          Le responsable du traitement s’engage à protéger les données à caractère personnel collectées, à ne pas
          les transmettre à des tiers sans que l’utilisateur n’en ait été informé et à respecter les finalités pour
          lesquelles ces données ont été collectées.<br/><br/>
 
          Le site dispose d’un certificat SSL afin de garantir que les informations et le transfert des données
          transitant par le site sont sécurisés.<br/><br/>
 
          Un certificat SSL (« Secure Socket Layer » Certificate) a pour but de sécuriser les données échangées
          entre l’utilisateur et le site.<br/><br/>
 
          De plus, le responsable du traitement des données s’engage à notifier l’utilisateur en cas de rectification
          ou de suppression des données, à moins que cela n’entraîne pour lui des formalités, coûts et démarches
          disproportionnés.<br/><br/>
 
          Dans le cas où l’intégrité, la confidentialité ou la sécurité des données à caractère personnel de
          l’utilisateur est compromise, le responsable du traitement s’engage à informer l’utilisateur par tout
          moyen.
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 5 : DROITS DE L'UTILISATEUR 
      </ArticleSubTitle>
      <TextContent>
          Conformément à la réglementation concernant le traitement des données à caractère personnel,
          l’utilisateur possède les droits ci-après énumérés.<br/><br/>
 
          Afin que le responsable du traitement des données fasse droit à sa demande, l’utilisateur est tenu de lui
          communiquer : ses prénom et nom ainsi que son adresse e-mail.<br/><br/>
 
          Le responsable du traitement des données est tenu de répondre à l’utilisateur dans un délai de 30
          (trente) jours maximum.
      </TextContent>
      <ArticleSubTitle>
          A. PRÉSENTATION DES DROITS DE L'UTILISATEUR EN MATIÈRE DE COLLECTE ET TRAITEMENT DE DONNÉES<br/>
          a. Droit d’accès, de rectification et droit à l’effacement
      </ArticleSubTitle>
      <TextContent>
          L’utilisateur peut prendre connaissance, mettre à jour, modifier ou demander la suppression des
          données le concernant, en respectant la procédure ci-après énoncée : <br/><br/>
 
          L’utilisateur doit contacter KeepYourPlanet via le mail fournis plus haut, en
          précisant son nom et prénom, ainsi que son mail et la nature de sa demande.
      </TextContent>
      <ArticleSubTitle>
          b. Droit à la portabilité des données
      </ArticleSubTitle>
      <TextContent>
          L’utilisateur a le droit de demander la portabilité de ses données personnelles, détenues par le site, vers
          un autre site, en se conformant à la procédure ci-après : <br/><br/>
 
          L’utilisateur doit contacter KeepYourPlanet via le mail fournis plus haut, en précisant son nom et prénom, ainsi que son mail et la nature de sa demande.
      </TextContent>
      <ArticleSubTitle>
          c. Droit à la limitation et à l’opposition du traitement des données
      </ArticleSubTitle>
      <TextContent>
          L’utilisateur a le droit de demander la limitation ou de s’opposer au traitement de ses données par le
          site, sans que le site ne puisse refuser, sauf à démontrer l’existence de motifs légitimes et impérieux,
          pouvant prévaloir sur les intérêts et les droits et libertés de l’utilisateur.<br/><br/>
 
          Afin de demander la limitation du traitement de ses données ou de formuler une opposition au
          traitement de ses données, l’utilisateur doit suivre la procédure suivante :<br/><br/>
 
          L’utilisateur doit contacter Brut de Com via le formulaire de contact fournis plus haut, en
          précisant son nom et prénom et la nature de sa demande.
      </TextContent>
      <ArticleSubTitle>
          d. Droit de ne pas faire l’objet d’une décision fondée exclusivement sur un procédé automatisé
      </ArticleSubTitle>
      <TextContent>
          Conformément aux dispositions du règlement 2016/679, l’utilisateur a le droit de ne pas faire l’objet
          d’une décision fondée exclusivement sur un procédé automatisé si la décision produit des effets
          juridiques le concernant, ou l’affecte de manière significative de façon similaire.
      </TextContent>
      <ArticleSubTitle>
          e. Droit de déterminer le sort des données après la mort
      </ArticleSubTitle>
      <TextContent>
          Il est rappelé à l’utilisateur qu’il peut organiser quel doit être le devenir de ses données collectées et
          traitées s’il décède, conformément à la loi n°2016-1321 du 7 octobre 2016.
      </TextContent>
      <ArticleSubTitle>
          f. Droit de saisir l’autorité de contrôle compétente
      </ArticleSubTitle>
      <TextContent>
          Dans le cas où le responsable du traitement des données décide de ne pas répondre à la demande de
          l’utilisateur, et que l’utilisateur souhaite contester cette décision, ou, s’il pense qu’il est porté atteinte à
          l’un des droits énumérés ci-dessus, il est en droit de saisir la CNIL (Commission Nationale de
          l’Informatique et des Libertés, https://www.cnil.fr) ou tout juge compétent.
      </TextContent>
      <ArticleSubTitle>
          B. DONNÉES PERSONNELLES DES PERSONNES MINEURES
      </ArticleSubTitle>
      <TextContent>
          Conformément aux dispositions de l’article 8 du règlement européen 2016/679 et à la loi Informatique
          et Libertés, seuls les mineurs âgés de 15 ans ou plus peuvent consentir au traitement de leurs données
          personnelles. <br/><br/>
 
          Si l’utilisateur est un mineur de moins de 15 ans, l’accord d’un représentant légal sera requis afin que
          des données à caractère personnel puissent être collectées et traitées.<br/><br/>
 
          L’éditeur du site se réserve le droit de vérifier par tout moyen que l’utilisateur est âgé de plus de 15
          ans, ou qu’il aura obtenu l’accord d’un représentant légal avant de naviguer sur le site.
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 6 : UTILISATION DES FICHIERS "COOKIES"
      </ArticleSubTitle>
      <TextContent>
          Ce site n'utilise pas les cookies.
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 7 : CONDITIONS DE MODIFICATION DE LA POLITIQUE DE CONFIDENTIALITÉ
      </ArticleSubTitle>
      <TextContent>
          La présente politique de confidentialité peut être consultée à tout moment à l’adresse ci-après
          indiquée :<br/><br/>
 
          https://keepyourplanet.fr/politique-de-confidentialité/<br/><br/>
 
          L’éditeur du site se réserve le droit de la modifier afin de garantir sa conformité avec le droit en
          vigueur.<br/><br/>
 
          Par conséquent, l’utilisateur est invité à venir consulter régulièrement cette politique de confidentialité
          afin de se tenir informé des derniers changements qui lui seront apportés.<br/><br/>
 
          Il est porté à la connaissance de l’utilisateur que la dernière mise à jour de la présente politique de
          confidentialité est intervenue le : 25/07/2020.
      </TextContent>
      <ArticleSubTitle>
          ARTICLE 8 : ACCEPTATION PAR L'UTILISATEUR DE LA POLITIQUE DE CONFIDENTIALITÉ
      </ArticleSubTitle>
      <TextContent>
          En naviguant sur le site, l’utilisateur atteste avoir lu et compris la présente politique de confidentialité
          et en accepte les conditions, en ce qui concerne plus particulièrement la collecte et le traitement de ses
          données à caractère personnel.
      </TextContent>
    </>

  )
}

ArticleSubTitle.propTypes = {
  children: PropTypes.any
}

TextContent.propTypes = {
  children: PropTypes.any
}

export default PrivacyPolicy
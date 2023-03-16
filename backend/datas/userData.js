const User = require('../database/models/user.model')

exports.insertUserDatas = async () => {
  const password = await User.hashPassword('Password123456789*')
  const user = new User({
    email: 'psypsy@gmail.gcom',
    password: password,
    username: 'psypsy',
    address: '1 rue adress',
    role: 'user',
    vehicle: {
      licencePlate: 'RD-470-EY',
      marque: 'Renault',
      // model: 'Impreza',
      year: 2012,
      carburant: 'Essence',
      emission: 134
    },
    globalData: {
      totalKm: 254,
      totalImpact: 1400
      // treeToPlant: 7,
      // numberTel: 2
    }
  })

  return user.save()
}

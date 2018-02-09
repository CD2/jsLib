import React from "react"
import PropTypes from "prop-types"

export default class Country extends React.Component {
  static propTypes = {
    includeBlank: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.any,
  }

  constructor() {
    super()
    this.countries = [
      `Afghanistan`,
      `Albania`,
      `Algeria`,
      `Andorra`,
      `Angola`,
      `Antigua and Barbuda`,
      `Argentina`,
      `Armenia`,
      `Australia`,
      `Austria`,
      `Azerbaijan`,
      `Bahamas`,
      `Bahrain`,
      `Bangladesh`,
      `Barbados`,
      `Belarus`,
      `Belgium`,
      `Belize`,
      `Benin`,
      `Bhutan`,
      `Bolivia`,
      `Bosnia and Herzegovina`,
      `Botswana`,
      `Brazil`,
      `Brunei`,
      `Bulgaria`,
      `Burkina Faso`,
      `Burundi`,
      `Cabo Verde`,
      `Cambodia`,
      `Cameroon`,
      `Canada`,
      `Central African Republic (CAR)`,
      `Chad`,
      `Chile`,
      `China`,
      `Colombia`,
      `Comoros`,
      `Democratic Republic of the Congo`,
      `Republic of the Congo`,
      `Costa Rica`,
      `Cote d'Ivoire`,
      `Croatia`,
      `Cuba`,
      `Cyprus`,
      `Czech Republic`,
      `Denmark`,
      `Djibouti`,
      `Dominica`,
      `Dominican Republic`,
      `Ecuador`,
      `Egypt`,
      `El Salvador`,
      `Equatorial Guinea`,
      `Eritrea`,
      `Estonia`,
      `Ethiopia`,
      `Fiji`,
      `Finland`,
      `France`,
      `Gabon`,
      `Gambia`,
      `Georgia`,
      `Germany`,
      `Ghana`,
      `Greece`,
      `Grenada`,
      `Guatemala`,
      `Guinea`,
      `Guinea-Bissau`,
      `Guyana`,
      `Haiti`,
      `Honduras`,
      `Hungary`,
      `Iceland`,
      `India`,
      `Indonesia`,
      `Iran`,
      `Iraq`,
      `Ireland`,
      `Israel`,
      `Italy`,
      `Jamaica`,
      `Japan`,
      `Jordan`,
      `Kazakhstan`,
      `Kenya`,
      `Kiribati`,
      `Kosovo`,
      `Kuwait`,
      `Kyrgyzstan`,
      `Laos`,
      `Latvia`,
      `Lebanon`,
      `Lesotho`,
      `Liberia`,
      `Libya`,
      `Liechtenstein`,
      `Lithuania`,
      `Luxembourg`,
      `Macedonia (FYROM)`,
      `Madagascar`,
      `Malawi`,
      `Malaysia`,
      `Maldives`,
      `Mali`,
      `Malta`,
      `Marshall Islands`,
      `Mauritania`,
      `Mauritius`,
      `Mexico`,
      `Micronesia`,
      `Moldova`,
      `Monaco`,
      `Mongolia`,
      `Montenegro`,
      `Morocco`,
      `Mozambique`,
      `Myanmar (Burma)`,
      `Namibia`,
      `Nauru`,
      `Nepal`,
      `Netherlands`,
      `New Zealand`,
      `Nicaragua`,
      `Niger`,
      `Nigeria`,
      `North Korea`,
      `Norway`,
      `Oman`,
      `Pakistan`,
      `Palau`,
      `Palestine`,
      `Panama`,
      `Papua New Guinea`,
      `Paraguay`,
      `Peru`,
      `Philippines`,
      `Poland`,
      `Portugal`,
      `Qatar`,
      `Romania`,
      `Russia`,
      `Rwanda`,
      `Saint Kitts and Nevis`,
      `Saint Lucia`,
      `Saint Vincent and the Grenadines`,
      `Samoa`,
      `San Marino`,
      `Sao Tome and Principe`,
      `Saudi Arabia`,
      `Senegal`,
      `Serbia`,
      `Seychelles`,
      `Sierra Leone`,
      `Singapore`,
      `Slovakia`,
      `Slovenia`,
      `Solomon Islands`,
      `Somalia`,
      `South Africa`,
      `South Korea`,
      `South Sudan`,
      `Spain`,
      `Sri Lanka`,
      `Sudan`,
      `Suriname`,
      `Swaziland`,
      `Sweden`,
      `Switzerland`,
      `Syria`,
      `Taiwan`,
      `Tajikistan`,
      `Tanzania`,
      `Thailand`,
      `Timor-Leste`,
      `Togo`,
      `Tonga`,
      `Trinidad and Tobago`,
      `Tunisia`,
      `Turkey`,
      `Turkmenistan`,
      `Tuvalu`,
      `Uganda`,
      `Ukraine`,
      `United Arab Emirates (UAE)`,
      `United Kingdom (UK)`,
      `United States of America (USA)`,
      `Uruguay`,
      `Uzbekistan`,
      `Vanuatu`,
      `Vatican City (Holy See)`,
      `Venezuela`,
      `Vietnam`,
      `Yemen`,
      `Zambia`,
      `Zimbabwe`,
    ]
  }

  handleChange = e => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  renderChoices() {
    const { includeBlank } = this.props
    const choiceHtml = []
    if (includeBlank) {
      const text =
        typeof includeBlank === `string` ? includeBlank : `-- Please select --`
      choiceHtml.push(
        <option key="$BLANK$" value="">
          {text}
        </option>,
      )
    }
    this.countries.forEach(choice => {
      choiceHtml.push(
        <option key={choice} value={choice}>
          {choice}
        </option>,
      )
    })
    return choiceHtml
  }

  render() {
    const { name, value } = this.props
    return (
      <select
        name={name}
        className="select"
        value={value}
        onChange={this.handleChange}
      >
        {this.renderChoices()}
      </select>
    )
  }
}

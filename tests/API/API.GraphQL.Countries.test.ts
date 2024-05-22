import { test, expect } from "@playwright/test";

test.describe("Graphql API tests", () => {
  test("Should be able to get details of all continents", async ({ request }) => {
    const response = await request.post(
      "https://countries.trevorblades.com/graphql",
      {
        data: {
          query: `
          query {
            continents {
              code
              name
            }
          }
        `,
        },
      }
    );
    expect(response.status()).toBe(200);
    const body = await response.json()
    expect(body).toStrictEqual({
      "data": {
        "continents": [
          {
            "code": "AF",
            "name": "Africa"
          },
          {
            "code": "AN",
            "name": "Antarctica"
          },
          {
            "code": "AS",
            "name": "Asia"
          },
          {
            "code": "EU",
            "name": "Europe"
          },
          {
            "code": "NA",
            "name": "North America"
          },
          {
            "code": "OC",
            "name": "Oceania"
          },
          {
            "code": "SA",
            "name": "South America"
          }
        ]
      }
    });
  });

  test("Should be able to get all details of a country", async ({ request }) => {
    const response = await request.post(
      "https://countries.trevorblades.com/graphql",
      {
        data: {
          query: `
          query {
            country(code: "CA") {
              awsRegion
              capital
              code
              continent {
                name
                code
              }
              currencies
              currency
              emoji
              emojiU
              languages {
                name
                code
              }
              name
              native
              phone
              phones
              states {
                code
                name
              }
              subdivisions {
                name
              }
            }
          }
        `,
        },
      }
    );
    expect(response.status()).toBe(200);
    const body = await response.json()
    expect(body).toStrictEqual(
      {
        "data": {
          "country": {
            "awsRegion": "us-west-2",
            "capital": "Ottawa",
            "code": "CA",
            "continent": {
              "name": "North America",
              "code": "NA"
            },
            "currencies": [
              "CAD"
            ],
            "currency": "CAD",
            "emoji": "🇨🇦",
            "emojiU": "U+1F1E8 U+1F1E6",
            "languages": [
              {
                "name": "English",
                "code": "en"
              },
              {
                "name": "French",
                "code": "fr"
              }
            ],
            "name": "Canada",
            "native": "Canada",
            "phone": "1",
            "phones": [
              "1"
            ],
            "states": [
              {
                "code": "AB",
                "name": "Alberta"
              },
              {
                "code": "BC",
                "name": "British Columbia"
              },
              {
                "code": "MB",
                "name": "Manitoba"
              },
              {
                "code": "NB",
                "name": "New Brunswick"
              },
              {
                "code": "NL",
                "name": "Newfoundland and Labrador"
              },
              {
                "code": "NS",
                "name": "Nova Scotia"
              },
              {
                "code": "NU",
                "name": "Nunavut"
              },
              {
                "code": "NT",
                "name": "Northwest Territories"
              },
              {
                "code": "ON",
                "name": "Ontario"
              },
              {
                "code": "PE",
                "name": "Prince Edward Island"
              },
              {
                "code": "QC",
                "name": "Quebec"
              },
              {
                "code": "SK",
                "name": "Saskatchewan"
              },
              {
                "code": "YT",
                "name": "Yukon"
              }
            ],
            "subdivisions": [
              {
                "name": "Nova Scotia"
              },
              {
                "name": "Manitoba"
              },
              {
                "name": "Saskatchewan"
              },
              {
                "name": "Quebec"
              },
              {
                "name": "Prince Edward Island"
              },
              {
                "name": "British Columbia"
              },
              {
                "name": "New Brunswick"
              },
              {
                "name": "Newfoundland and Labrador"
              },
              {
                "name": "Ontario"
              },
              {
                "name": "Alberta"
              }
            ]
          }
        }
      }
    );
  });

  test("Should be able to get all details of a language", async ({ request }) => {
    const response = await request.post(
      "https://countries.trevorblades.com/graphql",
      {
        data: {
          query: `
          query {  language(code: "en") {
            name
            code
            native
            rtl
            __typename
            }
          }
        `,
        },
      }
    );
    expect(response.status()).toBe(200);
    const body = await response.json()
    expect(body).toStrictEqual(
      {
        "data": {
          "language": {
            "name": "English",
            "code": "en",
            "native": "English",
            "rtl": false,
            "__typename": "Language"
          }
        }
      }
    );
  });

  test("Basic queries all return responses", async ({ request }) => {
    const response = await request.post(
      "https://countries.trevorblades.com/graphql",
      {
        data: {
          query: `
          query {  continent(code: "NA") {
            name
          }
          continents(filter: {code: {in: "NA"}}) {
            name
          }
          countries(filter: {code: {in: "CA"}}) {
            name
          }
          country(code: "CA") {
            name
          }
          language(code: "en") {
            name
          }
          languages(filter: {code: {nin: ["af", "am", "ar", "ay", "en"]}}) {
            name
            code
          }
          }
        `,
        },
      }
    );
    expect(response.status()).toBe(200);
    const body = await response.json()
    expect(body).toStrictEqual({
      "data": {
        "continent": {
          "name": "North America"
        },
        "continents": [
          {
            "name": "North America"
          }
        ],
        "countries": [
          {
            "name": "Canada"
          }
        ],
        "country": {
          "name": "Canada"
        },
        "language": {
          "name": "English"
        },
        "languages": [
          {
            "name": "Azerbaijani",
            "code": "az"
          },
          {
            "name": "Belarusian",
            "code": "be"
          },
          {
            "name": "Bulgarian",
            "code": "bg"
          },
          {
            "name": "Bislama",
            "code": "bi"
          },
          {
            "name": "Bengali",
            "code": "bn"
          },
          {
            "name": "Bosnian",
            "code": "bs"
          },
          {
            "name": "Catalan",
            "code": "ca"
          },
          {
            "name": "Chamorro",
            "code": "ch"
          },
          {
            "name": "Czech",
            "code": "cs"
          },
          {
            "name": "Danish",
            "code": "da"
          },
          {
            "name": "German",
            "code": "de"
          },
          {
            "name": "Divehi",
            "code": "dv"
          },
          {
            "name": "Dzongkha",
            "code": "dz"
          },
          {
            "name": "Greek",
            "code": "el"
          },
          {
            "name": "Spanish",
            "code": "es"
          },
          {
            "name": "Estonian",
            "code": "et"
          },
          {
            "name": "Basque",
            "code": "eu"
          },
          {
            "name": "Persian",
            "code": "fa"
          },
          {
            "name": "Peul",
            "code": "ff"
          },
          {
            "name": "Finnish",
            "code": "fi"
          },
          {
            "name": "Fijian",
            "code": "fj"
          },
          {
            "name": "Faroese",
            "code": "fo"
          },
          {
            "name": "French",
            "code": "fr"
          },
          {
            "name": "Irish",
            "code": "ga"
          },
          {
            "name": "Galician",
            "code": "gl"
          },
          {
            "name": "Guarani",
            "code": "gn"
          },
          {
            "name": "Manx",
            "code": "gv"
          },
          {
            "name": "Hebrew",
            "code": "he"
          },
          {
            "name": "Hindi",
            "code": "hi"
          },
          {
            "name": "Croatian",
            "code": "hr"
          },
          {
            "name": "Haitian",
            "code": "ht"
          },
          {
            "name": "Hungarian",
            "code": "hu"
          },
          {
            "name": "Armenian",
            "code": "hy"
          },
          {
            "name": "Indonesian",
            "code": "id"
          },
          {
            "name": "Icelandic",
            "code": "is"
          },
          {
            "name": "Italian",
            "code": "it"
          },
          {
            "name": "Japanese",
            "code": "ja"
          },
          {
            "name": "Georgian",
            "code": "ka"
          },
          {
            "name": "Kongo",
            "code": "kg"
          },
          {
            "name": "Kazakh",
            "code": "kk"
          },
          {
            "name": "Greenlandic",
            "code": "kl"
          },
          {
            "name": "Cambodian",
            "code": "km"
          },
          {
            "name": "Korean",
            "code": "ko"
          },
          {
            "name": "Kurdish",
            "code": "ku"
          },
          {
            "name": "Kyrgyz",
            "code": "ky"
          },
          {
            "name": "Latin",
            "code": "la"
          },
          {
            "name": "Luxembourgish",
            "code": "lb"
          },
          {
            "name": "Lingala",
            "code": "ln"
          },
          {
            "name": "Laotian",
            "code": "lo"
          },
          {
            "name": "Lithuanian",
            "code": "lt"
          },
          {
            "name": "Luba-Katanga",
            "code": "lu"
          },
          {
            "name": "Latvian",
            "code": "lv"
          },
          {
            "name": "Malagasy",
            "code": "mg"
          },
          {
            "name": "Marshallese",
            "code": "mh"
          },
          {
            "name": "Maori",
            "code": "mi"
          },
          {
            "name": "Macedonian",
            "code": "mk"
          },
          {
            "name": "Mongolian",
            "code": "mn"
          },
          {
            "name": "Malay",
            "code": "ms"
          },
          {
            "name": "Maltese",
            "code": "mt"
          },
          {
            "name": "Burmese",
            "code": "my"
          },
          {
            "name": "Nauruan",
            "code": "na"
          },
          {
            "name": "Norwegian Bokmål",
            "code": "nb"
          },
          {
            "name": "North Ndebele",
            "code": "nd"
          },
          {
            "name": "Nepali",
            "code": "ne"
          },
          {
            "name": "Dutch",
            "code": "nl"
          },
          {
            "name": "Norwegian Nynorsk",
            "code": "nn"
          },
          {
            "name": "Norwegian",
            "code": "no"
          },
          {
            "name": "South Ndebele",
            "code": "nr"
          },
          {
            "name": "Chichewa",
            "code": "ny"
          },
          {
            "name": "Occitan",
            "code": "oc"
          },
          {
            "name": "Panjabi / Punjabi",
            "code": "pa"
          },
          {
            "name": "Polish",
            "code": "pl"
          },
          {
            "name": "Pashto",
            "code": "ps"
          },
          {
            "name": "Portuguese",
            "code": "pt"
          },
          {
            "name": "Quechua",
            "code": "qu"
          },
          {
            "name": "Kirundi",
            "code": "rn"
          },
          {
            "name": "Romanian",
            "code": "ro"
          },
          {
            "name": "Russian",
            "code": "ru"
          },
          {
            "name": "Rwandi",
            "code": "rw"
          },
          {
            "name": "Sango",
            "code": "sg"
          },
          {
            "name": "Sinhalese",
            "code": "si"
          },
          {
            "name": "Slovak",
            "code": "sk"
          },
          {
            "name": "Slovenian",
            "code": "sl"
          },
          {
            "name": "Samoan",
            "code": "sm"
          },
          {
            "name": "Shona",
            "code": "sn"
          },
          {
            "name": "Somalia",
            "code": "so"
          },
          {
            "name": "Albanian",
            "code": "sq"
          },
          {
            "name": "Serbian",
            "code": "sr"
          },
          {
            "name": "Swati",
            "code": "ss"
          },
          {
            "name": "Southern Sotho",
            "code": "st"
          },
          {
            "name": "Swedish",
            "code": "sv"
          },
          {
            "name": "Swahili",
            "code": "sw"
          },
          {
            "name": "Tamil",
            "code": "ta"
          },
          {
            "name": "Tajik",
            "code": "tg"
          },
          {
            "name": "Thai",
            "code": "th"
          },
          {
            "name": "Tigrinya",
            "code": "ti"
          },
          {
            "name": "Turkmen",
            "code": "tk"
          },
          {
            "name": "Tswana",
            "code": "tn"
          },
          {
            "name": "Tonga",
            "code": "to"
          },
          {
            "name": "Turkish",
            "code": "tr"
          },
          {
            "name": "Tsonga",
            "code": "ts"
          },
          {
            "name": "Ukrainian",
            "code": "uk"
          },
          {
            "name": "Urdu",
            "code": "ur"
          },
          {
            "name": "Uzbek",
            "code": "uz"
          },
          {
            "name": "Venda",
            "code": "ve"
          },
          {
            "name": "Vietnamese",
            "code": "vi"
          },
          {
            "name": "Xhosa",
            "code": "xh"
          },
          {
            "name": "Chinese",
            "code": "zh"
          },
          {
            "name": "Zulu",
            "code": "zu"
          }
        ]
      }
    });
  });
});
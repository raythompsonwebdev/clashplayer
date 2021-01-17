module.exports = {
	"extends": "stylelint-config-standard",
	"plugins": ["stylelint-scss"],
	"rules": {
		"value-list-comma-newline-after": "never-multi-line",
		"font-family-no-missing-generic-family-keyword": true,
		"declaration-colon-newline-after":"always-multi-line",
	"at-rule-empty-line-before": [
					"never",
					{
							"ignore": ["after-comment","first-nested", "inside-block", "blockless-after-same-name-blockless", "blockless-after-blockless"]
					}
	],
	"rule-empty-line-before": [
					"always",
					{
							"ignore": ["after-comment","first-nested", "inside-block"]
					}
	],
	"declaration-empty-line-before": [
					"never",
					{
							"ignore": ["after-comment", "after-declaration", "first-nested", "inside-single-line-block"]
					}
			],
			"at-rule-no-unknown": null,
			"scss/at-rule-no-unknown": true,
	"no-descending-specificity": null,
	"indentation": "tab",
			"number-leading-zero": null,
			"unit-allowed-list": ["em", "rem", "%", "px" , "fr", "vh", "s" ,"vw"]
	},
}

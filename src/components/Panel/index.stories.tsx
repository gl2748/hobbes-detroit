import { action } from "@storybook/addon-actions"
import React from "react"
import { Panel } from "."

export default {
  title: "LoginForm",
}

export const visible = () => (
  <Panel isVisible={true} onClose={action("closed")}>
    hello
  </Panel>
)

export const notVisible = () => (
  <Panel isVisible={false} onClose={action("closed")}>
    hello
  </Panel>
)

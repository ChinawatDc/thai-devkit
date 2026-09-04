export class PromptManager {
  private prompts: Map<string, string> = new Map();

  register(name: string, template: string) {
    this.prompts.set(name, template);
  }

  get(name: string, variables: Record<string, string | number> = {}): string {
    const template = this.prompts.get(name);
    if (!template) {
      throw new Error(`Prompt template '${name}' not found.`);
    }

    return Object.entries(variables).reduce(
      (result, [key, value]) => result.replace(new RegExp(`{{${key}}}`, 'g'), String(value)),
      template
    );
  }
}

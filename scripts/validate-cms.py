"""Check that Pages CMS's editable fields match the site's JSON content.
Requires PyYAML. This does not authenticate to Pages CMS or test a remote save.
"""
import json
from pathlib import Path
import yaml

root = Path(__file__).resolve().parents[1]
config = yaml.safe_load((root / '.pages.yml').read_text())
assert config['media']['input'] == 'media'
assert config['media']['output'] == '/media'
for collection in config['content']:
    data = json.loads((root / collection['path']).read_text())
    fields = {field['name']: field for field in collection['fields']}
    entries = data if collection.get('list') else [data]
    for entry in entries:
        assert set(entry) <= set(fields), f'Uneditable fields: {set(entry) - set(fields)}'
        for key, field in fields.items():
            if field.get('required'):
                assert entry.get(key), f'Missing required field: {key}'
        if 'category' in entry:
            assert entry['category'] in fields['category']['options']['values']
print('CMS paths, required fields, categories and JSON fields match.')

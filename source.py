# -*- coding:utf-8 -*-
from bs4 import BeautifulSoup
import urllib
import re
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

data = unicode(urllib.urlopen(u'http://info.finance.naver.com/marketindex/exchangeList.nhn').read(), u"euc-kr")
soup = BeautifulSoup(data)

tbody = soup.find("tbody", {})
tr = tbody.findAll("tr", {})

list = []
for index, text in enumerate(tr):
	obj = {}
	obj["title"] = re.sub(ur"\s", "", str( text.find("td", {"class":"tit"}).get_text() ))
	obj["sale"] = text.find("td", {"class":"sale"}).get_text()
	list.append(obj)

t = '<items>'
for index, obj in enumerate(list):
    t += '<item><title>%s : %s</title><subtitle></subtitle><icon>icon.png</icon></item>' % (obj["title"], obj["sale"])
t += '</items>'

print t